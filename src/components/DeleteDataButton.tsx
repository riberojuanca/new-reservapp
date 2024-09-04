"use client";
import { useRouter } from "next/navigation";

const DeleteDataButton = () => {
  const router = useRouter();

  const deleteData = async () => {
    if (window.confirm("Are you sure you want to delete all data?")) {
      try {
        const response = await fetch("/api/delete-all-users/", {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          router.refresh();
        } else {
          alert("Error: " + data.error);
        }
      } catch (error) {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <button onClick={deleteData}>DB Data Delete 🗑️</button>
    </div>
  );
};

export default DeleteDataButton;
