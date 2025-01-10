import { useEffect, useRef, useState } from "react";
import { useGeneratePromptsMutation } from "../redux/queries/storyQuery";
import { useRequestPredictionMutation, useRequestPredictionStatusMutation } from "../redux/queries/predictionQuery";

const PromptGenerator = () => {
  const [storyText, setStoryText] = useState("");
  const [images, setImages] = useState<{ sceneNo: number; workId?: string; output?: string; status?: string; percentage: string }[]>([]);
  const [generatePrompts, { data: generatePromptsResponse }] = useGeneratePromptsMutation();
  const [requestPrediction, { data: predictionResponse }] = useRequestPredictionMutation();
  const [requestPredictionStatus] = useRequestPredictionStatusMutation();

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!predictionResponse?.id) return;

    intervalRef.current = setInterval(async () => {
      try {
        const response = await requestPredictionStatus(predictionResponse.id);
        const status = response.data?.status;

        const percentage = extractProgressPercentage(response.data?.logs || "");

        setImages((prevImages) =>
          prevImages.map((image) =>
            image.workId === predictionResponse.id
              ? { ...image, output: response.data?.output, status: response.data?.status, percentage: percentage?.toString() || "0" }
              : image
          )
        );

        if (status === "succeeded" || status === "failed") {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch (error) {
        console.error("Error fetching prediction status:", error);
      }
    }, 5000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [predictionResponse, requestPredictionStatus]);

  const extractProgressPercentage = (logText: string): number | null => {
    const regex = /(\d+)%\|/g;
    let match;
    let lastPercentage: number | null = null;

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
      setImages([...images, { sceneNo: index, workId: response.data?.id, output: response.data?.output, percentage: "0" }]);
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
        <div>
          {generatePromptsResponse?.map((prompt, index) => {
            const image = images.find((x) => x.sceneNo === index);

            return (
              <div key={index} className="mb-4 p-3 border rounded border-zinc-600">
                <h4>
                  Page {index + 1}
                  <span className="float-right">
                    {images[index] && (
                      <button className="mr-2" onClick={() => window.open(image?.output)}>
                        <span className="pr-5">{image?.status}</span>
                        <i className="fa-solid fa-image text-blue-500"></i>
                      </button>
                    )}
                    <button onClick={() => sendPrediction("1", prompt, index)}>
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
