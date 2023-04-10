import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListsStart,
  updateListsSuccess,
  updateListsFailure,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjk1NjE4MmEzMzA0MjJkYzcyNTEyMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTA5NzExMywiZXhwIjoxNjgxNTI5MTEzfQ.EUhy3zBUmzQbWjEFsUMpFFbv3myFHp7im00nSIdiuDY",
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

//create
export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  try {
    const res = await axios.post("/lists", list, {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjk1NjE4MmEzMzA0MjJkYzcyNTEyMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTA5NzExMywiZXhwIjoxNjgxNTI5MTEzfQ.EUhy3zBUmzQbWjEFsUMpFFbv3myFHp7im00nSIdiuDY",
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};

//delete
export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());
  try {
    await axios.delete("/lists/" + id, {
      headers: {
        authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjk1NjE4MmEzMzA0MjJkYzcyNTEyMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTA5NzExMywiZXhwIjoxNjgxNTI5MTEzfQ.EUhy3zBUmzQbWjEFsUMpFFbv3myFHp7im00nSIdiuDY",
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

export const updateLists = async (lists, list, dispatch) => {
  dispatch(updateListsStart())
  try {
    const res = await axios.put(
      "/lists/" + list._id,
      {
        title: lists.title,
        genre: lists.genre,
        type: lists.type,
        content: lists.content,
      },
      {
        headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjk1NjE4MmEzMzA0MjJkYzcyNTEyMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDkyOTMzNywiZXhwIjoxNjgxMzYxMzM3fQ.shLYSvy1CKBRT4jOEwVJ6j9zqPlll1nXJ0RfuWn43CY"
          ,
        },
      }
    );
    dispatch(updateListsSuccess(res.data));
  } catch (e) {
    dispatch(updateListsFailure())
  }
};