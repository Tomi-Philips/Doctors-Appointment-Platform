import VideoCall from "./video-call-ui";

export default async function VideoCallPage({ searchParams }) {
  const { roomName, userName } = await searchParams;
  const appointmentId = (await searchParams).appointmentId;

  return <VideoCall roomName={roomName} userName={userName} appointmentId={appointmentId} />;
}
