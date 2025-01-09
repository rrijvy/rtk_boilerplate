import { useState } from "react";

const PromptGenerator = () => {
  const [storyText, setStoryText] = useState("");
  const [responsePages, setResponsePages] = useState<Array<string>>([]);
  const [images, setImages] = useState<Array<string>>([]);

  const handleSubmit = async () => {
    setResponsePages([]);

    const response = await fetch("http://localhost:8000/generate-prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ story: storyText }),
    });

    if (!response.body) {
      console.error("No response body found.");
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      const lines = chunk.split("\n").filter((line) => line.startsWith("data: "));

      for (const line of lines) {
        try {
          const json = JSON.parse(line.replace("data: ", "").trim());
          const content = json.choices?.[0]?.delta?.content || "";
          accumulatedText += content;

          if (accumulatedText.includes("### Page ")) {
            const pages = accumulatedText
              .split(/### Page \d+/)
              .map((p) => p.trim())
              .filter((p) => p);
            setResponsePages(pages);
          }
        } catch (err) {
          console.error("Error parsing streamed response:", err);
        }
      }
    }
  };

  const sendPrediction = async (storyId: string, prompt: string, sceneNo: number) => {
    console.log(storyId, prompt, sceneNo);
    const url = "http://localhost:8000/request-prediction";
    const data = {
      story_id: storyId,
      prompt: prompt,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.output) {
        const imageArr = [...images];
        if (sceneNo) {
          imageArr.splice(sceneNo, 0, result.output);
          setImages(imageArr);
        }
      }
      console.log("Prediction Response:", result);
      return result;
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
      <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-5" onClick={handleSubmit}>
        GENERATE PROMPT
      </button>
      <hr />
      <div>
        <h3>Response:</h3>
        <div>
          {responsePages.map((page, index) => (
            <div key={index} className="mb-4 p-3 border rounded border-zinc-600">
              <h4>
                Page {index + 1}
                <span className="float-right">
                  {images[index] && (
                    <button className="mr-2" onClick={() => window.open(images[index])}>
                      <i className="fa-solid fa-image text-blue-500"></i>
                    </button>
                  )}
                  <button onClick={() => sendPrediction("1", page, index)}>
                    <i className="fa-brands fa-docker text-blue-500"></i>
                  </button>
                </span>
              </h4>
              <p>{page}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptGenerator;
