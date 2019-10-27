import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';
import {
  Container,
  Banner,
  Info,
  Title,
  InfoRow,
  InfoText,
  CancelButton,
  DetailsButton,
  DetailsButtonText,
  Details,
} from './styles';
import api from '~/services/api';
import colors from '~/styles/colors';

export default function Meetup({ data, handleRegister, handleCancel }) {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function getImage() {
      if (!__DEV__) return setImage(data.image.url);

      const response = await api.get(`/files/${data.image.path}`);
      console.tron.log(response);
      return setImage(response.config.url);
    }
    getImage();
  });

  return (
    <Container>
      <Banner
        source={{
          uri: String(image),
        }}
      />
      <Info>
        <Title>{data.title}</Title>
        <InfoRow>
          <Icon name="event" size={15} color={colors.placeholder} />
          <InfoText>
            {format(parseISO(data.date), "PP 'às' p BBBB ", { locale: pt })}
          </InfoText>
        </InfoRow>
        <InfoRow>
          <Icon name="location-on" size={15} color={colors.placeholder} />
          <InfoText>Local: {data.location}</InfoText>
        </InfoRow>
        <InfoRow last={!data.past}>
          <Icon name="person" size={15} color={colors.placeholder} />
          <InfoText>Organizado por: {data.creator.name}</InfoText>
        </InfoRow>
        <DetailsButton borderless={false} onPress={() => setVisible(!visible)}>
          <DetailsButtonText>
            {visible ? 'Fechar descrição' : 'Ver descrição'}
          </DetailsButtonText>
        </DetailsButton>
        {visible && <Details>{data.description}</Details>}

        {handleRegister && !data.past && (
          <Button onPress={handleRegister}>Inscrever-se</Button>
        )}

        {handleCancel && (
          <CancelButton onPress={handleCancel}>Cancelar inscrição</CancelButton>
        )}
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    past: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleRegister: PropTypes.func,
  handleCancel: PropTypes.func,
};

Meetup.defaultProps = {
  handleRegister: null,
  handleCancel: null,
};
