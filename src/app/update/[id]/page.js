"use client";

//next router가 아닌 navigation에서 가져오기
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const router = useRouter();
  const params = useParams();
  const id = params.id;
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:9999/topics/` + id)
      .then((res) => res.json())
      .then((res) => {
        setTitle(res.title);
        setBody(res.body);
      });
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch("http://localhost:9999/topics/" + id, options)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            const lastId = res.id;
            router.refresh();
            router.push(`/read/${lastId}`);
          });
      }}
    >
      <p>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <textarea
          name="body"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </p>
      <p>
        <input type="submit" value="update" />
      </p>
    </form>
  );
}
