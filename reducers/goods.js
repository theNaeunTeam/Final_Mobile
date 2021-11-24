const defaultValue = {
  check: 0,
  g_category: '',
  g_count: 0,
  g_discount: 0,
  g_expireDate: '',
  g_name: '',
  g_price: 0,
  g_status: 0,
  r_code: 0,
  r_count: 0,
  r_customOrder: '',
  r_firstTime: '',
  r_g_code: 0,
  r_owner: '',
  r_pay: 0,
  r_status: 0,
  r_u_id: '',
  searchInput: '',
};

export function goodsReducer(state = defaultValue, action) {
  switch (action.type) {
    case 'goToDetailPage':
      console.log(action.type, '리듀서 콜');
      console.log('화물 => ', action.payload);
      return action.payload;
    default:
      return state;
  }
}
