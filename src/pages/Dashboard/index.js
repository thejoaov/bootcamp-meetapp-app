import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';

import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import Background from '~/components/Background';

import {
  Container,
  DateSelect,
  DateButton,
  DateText,
  Empty,
  EmptyText,
  List,
} from './styles';
import api from '~/services/api';
import colors from '~/styles/colors';

function Dashboard({ isFocused }) {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [refreshing, setRefreshing] = useState(true);

  async function loadMeetups(selectedPage = 1) {
    if (selectedPage > 1 && !hasMore) return;
    const response = await api.get(
      `/meetups/?date=${date.toISOString(
        date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 3000),
      )}&page=${selectedPage}`,
    );

    setMeetups(
      selectedPage > 1 ? [...meetups, ...response.data] : response.data,
    );
    setHasMore(response.data.total_pages > selectedPage);
    setPage(selectedPage);
    setRefreshing(false);
  }

  useEffect(() => {
    if (isFocused) {
      setRefreshing(true);
      loadMeetups();
    }
    // eslint-disable-next-line
  }, [isFocused, date]);

  function handleDecrementDate() {
    setDate(subDays(date, 1));
  }

  function handleIncrementDate() {
    setDate(addDays(date, 1));
  }

  async function handleRegister(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);
      Alert.alert('#Delicinha!', 'Você se inscreveu nesse meetup!');
    } catch (error) {
      Alert.alert('Deu ruim', error.response.data.error);
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateSelect>
          <DateButton onPress={handleDecrementDate}>
            <Icon name="chevron-left" size={25} color={colors.button} />
          </DateButton>
          <DateText>{format(date, 'dd/MM/Y')}</DateText>
          <DateButton onPress={handleIncrementDate}>
            <Icon name="chevron-right" size={25} color={colors.button} />
          </DateButton>
        </DateSelect>

        {!refreshing &&
          (meetups.length ? (
            <List
              data={meetups}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetup
                  data={item}
                  handleRegister={() => handleRegister(item.id)}
                />
              )}
              onRefresh={loadMeetups}
              refreshing={refreshing}
              onEndReached={() => loadMeetups(page + 1)}
              onEndReachedThreshold={0.2}
            />
          ) : (
            <Empty>
              <Icon name="event-busy" size={45} color={colors.placeholder} />
              <EmptyText>Sem meetups por enquanto :/</EmptyText>
            </Empty>
          ))}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
