import { useParams } from "react-router-dom";
const PreviewFilePage = () => {
  const { file } = useParams();

  console.log(file);

  const url = decodeURIComponent(file);

  console.log(url);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-8 justify-center items-center bg-white rounded-lg shadow py-8 px-4 lg:w-[60vw]">
        {url && (
          <div className="w-full flex justify-center">
            {url.endsWith(".pdf") ? (
              <iframe
                src={url}
                className="w-full h-[500px] border"
                title="PDF Preview"
              ></iframe>
            ) : (
              <img
                src={url}
                alt="Preview"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewFilePage;
