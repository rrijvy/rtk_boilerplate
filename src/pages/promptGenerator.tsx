const PromptGenerator = () => {
  return (
    <div className="container mx-auto">
      <p className="text-2xl text-center p-5">Generate Image Prompt from Story</p>
      <textarea className="border rounded border-gray-800 w-full mx-auto p-5" rows={25}></textarea>
      <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full mt-5">
        GENERATE PROMPT
      </button>
    </div>
  );
};

export default PromptGenerator;
