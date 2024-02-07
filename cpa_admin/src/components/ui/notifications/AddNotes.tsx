import * as React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Typography,
  Box,
} from "@mui/material";
import {
  Notification,
  createNotification,
} from "@api/notification/notification";
import { zodResolver } from "@hookform/resolvers/zod";
import notesSchema from "./notesShema";
import { Controller, useForm } from "react-hook-form";
import queryClient, { invalidateAllQueries } from "../../../query-client";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddNotes = () => {
  const [open, setOpen] = React.useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<Notification>({
    resolver: zodResolver(notesSchema),
  });

  useEffect(() => reset(), []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "notifications");
    }
    setOpen(false);
  };

  const mutation = useNotifiedMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      handleClose(true);
      setHasChanged(true);
      reset();
    },
    showSuccessNotification: true,
  });

  const submitNotification = (newItem: Notification) => {
    if (isValid) {
      mutation.mutate(newItem);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        onClick={handleClickOpen}
      >
        Add news
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5" mb={2} fontWeight={700}>
            Add New News
          </Typography>
          <DialogContentText>
            To add new news please enter your title and description, and press
            the submit button to add new news.
          </DialogContentText>
          <Box component="form" sx={{ mt: 1 }}>
            <Controller
              name="title"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  label={"Title"}
                  required
                  fullWidth
                  disabled={mutation.isLoading}
                  error={errors.title !== undefined}
                  helperText={errors.title?.message}
                  placeholder={"Title"}
                  margin="normal"
                  id="title"
                  autoFocus
                  {...field}
                />
              )}
            />
            <Controller
              name="titleEng"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  label={"Title in english"}
                  required
                  fullWidth
                  disabled={mutation.isLoading}
                  error={errors.titleEng !== undefined}
                  helperText={errors.titleEng?.message}
                  placeholder={"Title in english"}
                  margin="normal"
                  id="titleEng"
                  {...field}
                />
              )}
            />

            <Controller
              name="text"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  placeholder={"Description"}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              )}
            />
            <Controller
              name="textEng"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  placeholder={"Description in English"}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit(submitNotification)}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNotes;
