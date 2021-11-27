import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {client} from '../lib/client';

const ViewContainer = styled.View`
  flex: 1;
  background-color: white;
`;

const DetailText = styled.Text`
  flex: 1;
  font-weight: bold;
  font-size: 15px;
`;
const RowView = styled.View`
  flex-direction: row;
  margin: 3px;
  border-bottom-width: 0.5px;
`;
const ApproveButton = styled.Pressable`
  background-color: rgba(75, 192, 192, 0.2);
  padding: 15px;
  border-radius: 5px;
  margin: 10px;
  align-items: center;
`;

const DenyButton = styled.Pressable`
  background-color: rgba(255, 99, 132, 0.2);
  padding: 15px;
  border-radius: 5px;
  margin: 10px;
  align-items: center;
`;

const NoShowButton = styled.Pressable`
  background-color: rgba(153, 102, 255, 0.2);
  padding: 15px;
  border-radius: 5px;
  margin: 10px;
  align-items: center;
`;

export default function Detail(props) {
  const {goodsReducer} = useSelector(state => state);
  const dispatch = useDispatch();

  const changeGoodsStatus = async input => {
    const data = {
      r_code: goodsReducer.r_code,
      check: input,
    };
    console.log('서버로 보내는 데이타 : ', data);
    const URL = `https://thenaeunteam.link/owner/statusChange`;

    try {
      const res = await client.patch(URL, data);
      console.log(res);
      props.navigation.navigate('Main');
      dispatch({type: 'switch'});
      alert('성공');
    } catch (e) {
      console.log(e);
      alert('상품상태변경 실패');
    }
  };

  return (
    <ViewContainer style={styles.container}>
      <RowView>
        <DetailText>상품 명 : </DetailText>
        <DetailText>{goodsReducer.g_name}</DetailText>
      </RowView>
      <RowView>
        <DetailText>상품 분류 : </DetailText>
        <DetailText>{goodsReducer.g_category}</DetailText>
      </RowView>
      <RowView>
        <DetailText>원가 : </DetailText>
        <DetailText>₩{goodsReducer.g_price}</DetailText>
      </RowView>
      <RowView>
        <DetailText>할인가: </DetailText>
        <DetailText>₩{goodsReducer.g_discount}</DetailText>
      </RowView>
      <RowView>
        <DetailText>예약 수량 : </DetailText>
        <DetailText>{goodsReducer.r_count}</DetailText>
      </RowView>
      <RowView>
        <DetailText>총 결제 예정 금액 : </DetailText>
        <DetailText>₩{goodsReducer.r_pay}</DetailText>
      </RowView>
      <RowView>
        <DetailText>유통기한 : </DetailText>
        <DetailText>{goodsReducer.g_expireDate}</DetailText>
      </RowView>
      <RowView>
        <DetailText>상품 고유 번호 : </DetailText>
        <DetailText>{goodsReducer.r_g_code}</DetailText>
      </RowView>
      <RowView>
        <DetailText>상품 상태 : </DetailText>
        <DetailText>{goodsReducer.g_status}</DetailText>
      </RowView>
      <RowView>
        <DetailText>예약 고유 번호 : </DetailText>
        <DetailText>{goodsReducer.r_code}</DetailText>
      </RowView>
      <RowView>
        <DetailText>예약 시간 : </DetailText>
        <DetailText>{goodsReducer.r_firstTime}</DetailText>
      </RowView>
      <RowView>
        <DetailText>예약 상태 코드 : </DetailText>
        <DetailText>{goodsReducer.r_status}</DetailText>
      </RowView>
      <RowView>
        <DetailText>예약자 아이디 : </DetailText>
        <DetailText>{goodsReducer.r_u_id}</DetailText>
      </RowView>
      <RowView>
        <DetailText>요청사항 : </DetailText>
        <DetailText>{goodsReducer.r_customOrder}</DetailText>
      </RowView>
      {goodsReducer.r_status === 0 ? (
        <>
          <ApproveButton onPress={() => changeGoodsStatus(1)}>
            <Text>승 인</Text>
          </ApproveButton>
          <DenyButton onPress={() => changeGoodsStatus(2)}>
            <Text>거 절</Text>
          </DenyButton>
        </>
      ) : (
        <>
          <NoShowButton onPress={() => changeGoodsStatus(4)}>
            <Text>노 쇼</Text>
          </NoShowButton>
          <Pressable style={styles.button} onPress={() => changeGoodsStatus(3)}>
            <Text>판 매 완 료</Text>
          </Pressable>
        </>
      )}
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  viewTop: {
    flex: 1,
    backgroundColor: '#D4ECDD',
  },
  viewMiddle: {
    flex: 2,
    backgroundColor: '#345B63',
    justifyContent: 'space-evenly',
  },
  viewBottom: {
    flex: 0.5,
    backgroundColor: '#152D35',
  },
  form: {
    borderRadius: 10,
    borderWidth: 5,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'white',
    padding: 10,
    height: 50,
    margin: 10,
    color: 'black',
  },
  bottomText: {
    color: 'white',
    alignContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#D4ECDD',
    padding: 15,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#112031',
    textAlign: 'center',
  },
  labelText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 20,
  },
});
