import { useEffect, useRef, useState } from "react";
import { useGeneratePromptsMutation } from "../redux/queries/storyQuery";
import { useRequestPredictionMutation, useRequestPredictionStatusMutation } from "../redux/queries/predictionQuery";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ActionsPromptGenerator } from "../redux/slices/promptGeneratorSlice";
import { shallowEqual } from "react-redux";

const PromptGenerator = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => ({ promptQueue: state.promptGenerator.promptQueue }), shallowEqual);
  const [storyText, setStoryText] = useState("");
  const [generatePrompts, { data: generatePromptsResponse }] = useGeneratePromptsMutation();
  const [requestPrediction] = useRequestPredictionMutation();
  const [requestPredictionStatus] = useRequestPredictionStatusMutation();

  const intervalRef = useRef<NodeJS.Timeout>();

  const storyId = "6784e6cc9b2007bc3a214a45";

  useEffect(() => {
    const activePrompts = store.promptQueue.filter((x) => x.status === "processing" || x.status === "starting");

    if (activePrompts.length <= 0) return;

    intervalRef.current = setInterval(async () => {
      try {
        for (const prompt of activePrompts) {
          const response = await requestPredictionStatus(prompt.predictionId);
          const percentage = extractProgressPercentage(response.data?.logs || "");
          dispatch(
            ActionsPromptGenerator.updatePromptInQueue({
              ...prompt,
              status: response.data?.status,
              output: response.data?.output,
              percentage: percentage,
            })
          );
        }

        if (activePrompts.length === 0) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
          }
        }
      } catch (error) {
        console.error("Error fetching prediction status:", error);
      }
    }, 7000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [dispatch, requestPredictionStatus, store.promptQueue]);

  const extractProgressPercentage = (logText: string) => {
    const regex = /(\d+)%\|/g;
    let match;
    let lastPercentage: number = 0;

    while ((match = regex.exec(logText)) !== null) {
      lastPercentage = parseInt(match[1], 10);
    }

    return lastPercentage;
  };

  const generateImageGenerationPrompts = async () => {
    await generatePrompts({ story: storyText });
  };

  const sendPrediction = async (storyId: string, prompt: string, index: number) => {
    try {
      const response = await requestPrediction({ story_id: storyId, prompt: prompt });
      if (response.data?.id)
        dispatch(
          ActionsPromptGenerator.queuePrompt({
            storyId: storyId,
            sceneNo: index,
            predictionId: response.data.id,
            status: response.data.status,
          })
        );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <p className="text-2xl text-center p-5">Generate Image Prompt from Story</p>
      <textarea
        className="border rounded border-gray-800 w-full mx-auto p-5"
        rows={15}
        onChange={(e) => setStoryText(e.target.value)}
      ></textarea>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-5"
        onClick={generateImageGenerationPrompts}
      >
        GENERATE PROMPT
      </button>
      <hr />
      <div>
        <h3>Response:</h3>
        <div data-story_id={storyId}>
          {generatePromptsResponse?.map((prompt, index) => {
            const prediction = store.promptQueue.find((x) => x.storyId === storyId && x.sceneNo === index);
            return (
              <div key={index} className="mb-4 p-3 border rounded border-zinc-600">
                <h4>
                  Page {index + 1}
                  <span className="float-right">
                    {prediction && (
                      <button className="mr-2" onClick={() => window.open(prediction?.output)}>
                        <span className="pr-5 uppercase">{prediction?.status}</span>
                        <i className="fa-solid fa-image text-blue-500"></i>
                      </button>
                    )}
                    <button onClick={() => sendPrediction(storyId, prompt, index)}>
                      <i className="fa-brands fa-docker text-blue-500"></i>
                    </button>
                  </span>
                </h4>
                <p>{prompt}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
