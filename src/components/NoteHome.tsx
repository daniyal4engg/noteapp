import React, { FC, FormEvent, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
  Center,
} from "@chakra-ui/react";
import ShowNoteData from "./ShowNoteData";
import { NoteTypes } from "../types/type";

export interface DataType {
  title: string;
  noteText: string;
  date: number;
}

const initFormData = {
  title: "",
  noteText: "",
  date: Number(new Date().toString()),
};

const NoteHome: FC = () => {
  const [formData, setFormData] = useState<DataType>(initFormData);
  const [storeData, setStoreData] = useState<NoteTypes[]>([]);

  //edit prefilled form -- insert automatically
  // const [editTitle, setEditTitle] = useState("");
  // const [editNote, setEditNote] = useState("");
  // const [updateId, setUpdateID] = useState<number | null>(null);
  // const [noteId, setNoteId] = useState<NoteTypes | null>(null);

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  // submit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:8080/noteAppData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        GetData();
      })
      .catch(() => {
        alert("Error Occured");
      });
  };

  //  getting data from API
  const GetData = async () => {
    try {
      const response = await fetch("http://localhost:8080/noteAppData");
      const data = await response.json();
      console.log("data", data);
      setStoreData([...data]);

      //   setNoteId(data[0].id);
    } catch (error) {
      console.log(error);
    }
  };
  // Delete Data from Json API
  const deleteData = async (id: number) => {
    fetch(`http://localhost:8080/noteAppData/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) =>
        // this is the data we get after doing the delete request, do whatever you want with this data
        // console.log(data)
        GetData()
      );
  };

  const handleEdit = (id: number) => {
    fetch(`http://localhost:8080/noteAppData/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storeData),
    })
      .then((r) => {
        console.log(r);
        GetData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <Center>
      <Stack style={{ width: "40%" }}>
        <form data-testid={"formContainer"} onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter title "
              name="title"
              onChange={handleChange}
              data-testid="title"
              value={formData.title}
            />
            <FormLabel>Note Text</FormLabel>
            <Textarea
              placeholder="Enter your notes"
              name="noteText"
              onChange={handleChange}
            />
            <Button type="submit" mt={3}>
              Add Note
            </Button>
          </FormControl>
        </form>
        <ShowNoteData
          storeData={storeData}
          deleteData={deleteData}
          handleEdit={handleEdit}
          storeData1={storeData}
          setStoreData={setStoreData}
        />
      </Stack>
    </Center>
  );
};

export default NoteHome;
