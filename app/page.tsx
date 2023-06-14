"use client";
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const savePrompt = () => {
    axios.post("/api", { prompt }).then(() => {
      toast.success("Prompt saved, you can still add more", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setPrompt("");
    });
  };
  return (
    <main className={styles.main}>
      <h1>Thank you for the help</h1>
      <p>
        This goal here is to generate broad dataset for e-commerce and SMEs,
        where important information such as product name, quantity, color, size,
        price, rating, gender etc. from the customer's input can be extracted
        machine learning{" "}
      </p>
      <p>
        In the textbox below, assume you are trying to make an order for
        eletronics and fasion items you love and please be more specific in
        terms of color, quantity, exact price or price ranges, gender(fashion),
        size(fasion)
      </p>
      <p>
        E.g. "I would like to order 2 medium size t-shirts in white and black
        colors respectively, price ranging from $10 to $20"
      </p>
      <p>
        E.g. "Do you have any google pixel phone available in black and white"
      </p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        cols={30}
        rows={10}
        style={{ borderRadius: 12, padding: 14 }}
      ></textarea>
      <button className={styles.button} onClick={() => savePrompt()}>
        Save
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
}
