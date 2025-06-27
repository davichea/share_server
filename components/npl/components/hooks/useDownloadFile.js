import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RingLoader from "react-spinners/RingLoader";
import Router, { useRouter } from "next/router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  minHeight: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  py: 6,
  outline: 0,
  borderRadius: "6px",
  border: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function useDownloadFile() {
  const router = useRouter();
  const [metadata, setMetadata] = useState({
    fileName: "",
    count: 0,
    currentCount: 0,
    loading: false,
    done: false,
  });

  const [downloadStartTime, setDownloadStartTime] = useState(0);

  const percentage = (
    isNaN(metadata.currentCount)
      ? 100
      : !metadata.currentCount
        ? 0
        : !metadata.count
          ? 100
          : (metadata.currentCount / metadata.count) * 100
  ).toFixed(0);

  const timeElapsed = (Date.now() - downloadStartTime) / 1000;
  const timeRemaining = isNaN(Number(percentage))
    ? 0
    : ((timeElapsed / Number(percentage)) * (100 - Number(percentage))).toFixed(0);

  const onDownloadFile = async (service, filter) => {
    const token = sessionStorage.getItem("token");
    setMetadata({ ...metadata, loading: true });
    setDownloadStartTime(Date.now());

    try {
      const response = await service.downloadFileWithProgress(
        token,
        filter,
        (progressEvent) => {
          const { loaded, total } = progressEvent;
          if (total) {
            setMetadata((prev) => ({
              ...prev,
              currentCount: loaded,
              count: total,
            }));
          }
        }
      );

      // Extract filename from headers
      let filename = "download.xlsx";
      const contentDisposition = response.headers?.["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match?.[1]) {
          filename = decodeURIComponent(match[1]);
        }
      }

      // Save file
      const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Done
      setMetadata((prev) => ({
        ...prev,
        fileName: filename,
        done: true,
        loading: false,
      }));

      setTimeout(() => {
        setMetadata({
          fileName: "",
          count: 0,
          currentCount: 0,
          loading: false,
          done: false,
        });
      }, 2000);
    } catch (error) {
      console.error("Download error:", error);
      setMetadata({ ...metadata, loading: false });
      if (error.status === 403) router.push("/");
    }
  };

  return {
    onDownloadFile,
    element: (
      <Modal open={!!metadata.loading || !!metadata.done}>
        <Box sx={style}>
          {metadata.loading ? (
            <div className="w-full min-h-[240px] flex flex-1 justify-center items-center">
              <div className="flex flex-col items-center">
                <RingLoader size={70} loading={metadata.loading} />
                <h1 className="pt-5 text-gray-700">Please wait a moment</h1>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-8">
              <h2>
                <p className="text-center font-medium text-xl">Downloading</p>
                <p className="text-center font-medium text-xl">{metadata.fileName}</p>
              </h2>
              <div className="w-[180px] mx-auto">
                {metadata.done ? (
                  <CircularProgressbar
                    styles={{
                      path: { stroke: "#3b82f6" },
                      text: { fill: "#3b82f6" },
                    }}
                    strokeWidth={7}
                    value={100}
                    text={`Done`}
                  />
                ) : (
                  <CircularProgressbar
                    styles={{
                      path: { stroke: "#3b82f6" },
                      text: { fill: "#3b82f6" },
                    }}
                    strokeWidth={7}
                    value={percentage}
                    text={`${percentage}%`}
                  />
                )}
              </div>
              <div className={metadata.done ? "hidden" : "absolute bottom-4 right-4 text-xs text-gray-400"}>
                {timeRemaining == Infinity ? 0 : timeRemaining} seconds left
              </div>
            </div>
          )}
        </Box>
      </Modal>
    ),
  };
}
