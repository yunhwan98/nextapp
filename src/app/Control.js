"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>

      {id ? (
        <>
          <li>
            <Link href={"/update/" + id}>Update</Link>
          </li>
          <li>
            {/* 삭제 기능구현 */}
            <input
              type="button"
              value="delete"
              onClick={() => {
                const options = { method: "DELETE" };
                fetch("http://localhost:9999/topics/" + id, options)
                  .then((res) => res.json())
                  .then((res) => {
                    router.push("/");
                    router.refresh();
                  });
              }}
            />
          </li>
        </>
      ) : null}
    </ul>
  );
}
