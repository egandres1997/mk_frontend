const initialState = {
  user: {},
  permissions: {},
  error: { message: '' },
  isAuthenticated: false,
  availableRoles: [],
  currentRole: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}