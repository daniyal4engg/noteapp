import React, { useState } from "react";
import { Text, Center, Stack, Button, Textarea } from "@chakra-ui/react";
import { NoteTypes } from "../types/type";
// import { PopUp } from "./PopUp";
interface Props {
  storeData: NoteTypes[];
  deleteData: (id: number) => Promise<void>;
  handleEdit(id: number): void;
  storeData1: any;
  setStoreData: any;
}

const ShowNoteData = ({
  storeData,
  deleteData,
  storeData1,
  setStoreData,
}: Props) => {
  const [isEdit, setIsEdit] = useState(true);
  console.log(storeData);
  // handleChange
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { name, value } = event.target;
    setStoreData({ ...storeData1, [name]: value });
  };
  // handleIconeChange
  const HandleFeildChange = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      {storeData.map((item) => (
        <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
          <Stack direction="row" alignItems="center">
            <Text fontWeight="semibold">{item.title}</Text>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
          >
            {isEdit ? (
              <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
                {item.noteText}
              </Text>
            ) : (
              <Textarea
                onChange={handleChange}
                name="noteTextArea"
                placeholder="Edit note"
              />
            )}
            <Stack direction="row" alignItems="center">
              <Text fontWeight="semibold">{item.date}</Text>
            </Stack>
            <Stack direction={{ base: "column", md: "row" }}>
              <Button
                onClick={HandleFeildChange}
                variant="outline"
                colorScheme="green"
              >
                Edit
              </Button>
              {/* <Delete /> */}
              <Button colorScheme="green" onClick={() => deleteData(item.id)}>
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </div>
  );
};

export default ShowNoteData;
