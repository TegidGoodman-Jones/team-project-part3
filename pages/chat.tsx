import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import $ from "jquery";

export default function Chat() {
  const [userId, setUserId] = useState();
  const router = useRouter();
  useEffect(() => {
    const token = String(localStorage.getItem("token"));
    try {
      // json parse and stringify to please typescript
      let decoded = JSON.parse(JSON.stringify(jwt.verify(token, "your_jwt_secret")));
      // set userId to state
      setUserId(decoded.userId);
      // change theme to user selected theme
      $("html").attr("data-theme", decoded.theme);
    } catch (e) {
      // if error with token send user to login page
      router.push("/login");
    }
  }, []);

  return;
}
