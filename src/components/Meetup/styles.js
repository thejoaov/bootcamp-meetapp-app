import styled from 'styled-components/native';

import Button from '~/components/Button';
import colors from '~/styles/colors';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

export const Container = styled.View.attrs({
  elevation: 2,
})`
  background: ${colors.card};
  border-radius: 4px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  overflow: hidden;
`;

export const Banner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 170px;
  align-content: stretch;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.header};
  margin-bottom: 15px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  color: ${colors.placeholder};
  margin-left: 6px;
`;

export const DetailsButtonText = styled.Text`
  font-size: 16px;
  color: ${colors.ctabutton};
  font-weight: bold;
  margin: 30px auto;
`;

export const Details = styled.Text`
  font-size: 14px;
  color: ${colors.placeholder};
  margin-left: 6px;
  margin-bottom: 30px;
`;

export const DetailsButton = styled(RectButton)`
  color: ${colors.ctabutton};
`;

export const CancelButton = styled(Button)`
  background: ${colors.button};
`;
