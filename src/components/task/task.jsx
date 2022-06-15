import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import classes from "./style.module.scss";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { Button, LinearProgress } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { collection, addDoc, } from "firebase/firestore";

let Task = ({ db }) => {
  let auth = getAuth();
  let submitTask = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "task"), {
        title: values.title,
        text: values.text,
        isOwner: auth.currentUser.uid,
      });


      console.log( docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <div className={classes.tasks}>
        <div className={classes.tasks_box}>
          <Formik
            initialValues={{
              title: "",
              text: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = "Required";
              }
              if (!values.text) {
                errors.text = "Required";
              }
              return errors;
            }}
            onSubmit={async(values, { setSubmitting }) => {
                try {
                    const docRef = await addDoc(collection(db, "task"), {
                        title: values.title,
                        text: values.text,
                        isOwner: auth.currentUser.uid,
                    });

                    console.log( docRef);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }}
          >
            {({ submitForm, isSubmitting }) => (
              <Form className={classes.tasks_form}>
                <Field
                  component={TextField}
                  name="title"
                  type="text"
                  label="Заголовок задачи"
                  className={classes.form_item}
                />
                <br />
                <Field
                  component={TextField}
                  type="textarea"
                  label="Текст задачи"
                  name="text"
                  multiline
                  className={classes.form_item}
                />

                <br />

                {isSubmitting && <LinearProgress />}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <div className={classes.active_tasks}>
            <div className={classes.active_task}>
              <div className={classes.active_task_item}>
                <h4>Активная задача</h4>
                <p className={classes.active_task_text}>text</p>
                <ul>
                  <CreateIcon className={classes.icon}></CreateIcon>
                  <CloseIcon className={classes.icon}></CloseIcon>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
