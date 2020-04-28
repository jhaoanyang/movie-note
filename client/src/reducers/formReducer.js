import * as type from '../actions/types';

const initialState = {
  data: [],
  edited: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.LOAD_FORM:
      return {
        ...state,
        data: [...action.payload],
      };

    case type.ADD_FORM:
      return {
        ...state,
        data: [
          ...state.data,
          {
            ...action.payload,
          },
        ],
      };

    case type.EDIT_FORM:
      const newStateData = state.data.map((item) => {
        if (item._id === action.id) {
          return {
            ...item,
            ...action.payload,
          };
        } else {
          return item;
        }
      });

      let match = false;
      let newStateEdited = state.edited.map((item) => {
        if (item._id === action.id) {
          match = true;
          return {
            ...item,
            ...action.payload,
          };
        } else {
          return item;
        }
      });

      if (match === false) {
        newStateEdited = [
          ...state.edited,
          {
            _id: action.id,
            ...action.payload,
          },
        ];
      }

      return {
        ...state,
        data: newStateData,
        edited: newStateEdited,
      };
    
    case type.DELETE_FORM:
      const newStateDataDeleted = state.data.filter((item) => {
        return item._id !== action.id
      });

      const newStateEditedDeleted = state.edited.filter((item) => {
        return item._id !== action.id
      });

      return {
        data: newStateDataDeleted,
        edited: newStateEditedDeleted
      };

    case type.UPDATE_DB:
      return {
        ...state,
        edited: []
      };

    default:
      return state;
  }
};
