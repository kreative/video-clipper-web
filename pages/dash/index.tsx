import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import TableSkeleton from "@/components/TableSkeleton";
import { useQuery } from "@tanstack/react-query";
import useUsers from "@/hooks/useUsers";
import { VideosTable } from "@/components/videos/VideosTable";
import { columns } from "@/components/videos/columns";

export default function Home() {
  const { getVideosForUser } = useUsers();

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      return await getVideosForUser();
    },
  });

  return (
    <div>
      <Navbar activeLink="index" gradientType="regular" />
      <Container>
        <h1 className="pt-32 text-3xl font-bold tracking-tight px-4 min-[840px]:px-0 pb-6">
          Your videos
        </h1>
        {isLoading && <TableSkeleton count={10} />}
        {isSuccess && data.videos.length === 0 && <p>No videos found</p>}
        {isSuccess && data.videos.length !== 0 && (
          <VideosTable columns={columns} data={data.videos} />
        )}
      </Container>
    </div>
  );
}
