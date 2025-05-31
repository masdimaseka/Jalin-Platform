import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useAuthUser } from "../../queries/auth/authQuery";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTransaksiById } from "../../queries/transaksi/transaksiQuery";
import CustomHeader from "../../components/chat/CustomHeader";
import { CardTransaksiModal } from "../../components/modals/CardTransaksiModal";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const { idTransaksi: transaksiId } = useParams();
  const { data: authUser } = useAuthUser();
  const { data: transaksiById, isLoading: isLoadingTransaksi } =
    useTransaksiById(transaksiId);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/chat/token");
        return res.data;
      } catch (err) {
        if (err.response && err.response.status === 401) return null;
        return null;
      }
    },
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser || !transaksiById?._id) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = transaksiById._id;

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId, transaksiById?._id]);

  if (isLoading || isLoadingTransaksi || !transaksiById) {
    return (
      <div className="flex justify-center mt-20">
        <Icon icon="line-md:loading-loop" width="64" height="64" color="gray" />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 w-full">
      {transaksiById && (
        <Link
          to={`/jahitan/${transaksiById._id}`}
          className="card bg-base-100 w-80 shadow-sm cursor-pointer h-full hidden lg:block"
        >
          <figure className="w-full h-48 overflow-hidden rounded-lg">
            <img
              src={transaksiById.image?.[0] || "/banner.png"}
              alt="Jahitan"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body flex justify-between">
            <h2 className="card-title line-clamp-2">{transaksiById.judul}</h2>
            <div className="flex flex-col lg:flex-row flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-1">
                <Icon
                  icon="material-symbols-light:work-history"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
                <p className="text-sm">{transaksiById.status}</p>
              </span>
              <span className="flex items-center gap-1">
                <Icon
                  icon="solar:calendar-bold"
                  width="16"
                  height="16"
                  color="red"
                />
                <p className="text-sm">
                  {new Date(transaksiById.tenggatWaktu).toLocaleString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "UTC",
                    }
                  )}
                </p>
              </span>

              <span className="flex items-center gap-1">
                <Icon
                  icon="mage:delivery-truck-fill"
                  width="20"
                  height="20"
                  className="text-primary-jalin"
                />
                <p className="text-sm">{transaksiById.pengerjaan}</p>
              </span>
            </div>
          </div>
        </Link>
      )}

      <div className="h-[80vh] w-full lg:w-[60vw]">
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <div className="w-full relative">
              <Window>
                <div className="flex lg:block items-center justify-between w-full gap-4 p-4">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="lg:hidden p-4 border-2 rounded-xl border-gray-200 "
                  >
                    <Icon
                      icon="solar:clipboard-list-bold"
                      width="32"
                      height="32"
                      className="text-primary-jalin"
                    />
                  </button>
                  <CustomHeader
                    dataUser={channel?.state?.members[targetUserId]?.user}
                  />
                </div>
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
            <Thread />
          </Channel>
        </Chat>
      </div>

      {isOpen && (
        <CardTransaksiModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          transaksiData={transaksiById}
        />
      )}
    </div>
  );
};

export default ChatPage;
