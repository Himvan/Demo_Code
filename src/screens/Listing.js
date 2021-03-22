import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';
import {inject, observer} from 'mobx-react';
import {_} from 'lodash';
import Loader from 'Demo/src/components/Loader';
import {millisToMinutesAndSeconds} from 'Demo/src/utils/CommonFunctions';

@inject('ListingStore')
@observer
class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getSongsListing();
  }

  getSongsListing = async () => {
    const {ListingStore} = this.props;
    this.setState({isLoading: true});
    await ListingStore.getSongsListing();
    this.setState({isLoading: false});
  };

  renderData = (item) => {
    console.log(item);
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginVertical: 20,
        }}>
        <View
          style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{uri: item.artworkUrl100}}
            style={{height: 100, width: 100}}
            resizeMode="cover"
          />
        </View>
        <View
          style={{flex: 0.6, marginLeft: 10, justifyContent: 'space-between', paddingBottom: 10}}>
          <Text style={{color: '#6BA1D9', fontSize: 18}} numberOfLines={3}>
            {item.collectionName ? item.collectionName : item.trackName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#6BA1D9', fontWeight: 'bold', fontSize: 12}}>
              {item.artistName}
            </Text>
            <Text style={{marginLeft: 20, color: '#6BA1D9', fontWeight: 'bold', fontSize: 12}}>
              {item.trackTimeMillis &&
                millisToMinutesAndSeconds(item.trackTimeMillis)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {ListingStore} = this.props;
    return (
      <View style={{flex: 1}}>
        <Loader loading={this.state.isLoading} />
        <FlatList
          data={ListingStore.listingData}
          renderItem={({item}) => {
            return this.renderData(item);
          }}
          keyExtractor={(item) => item.artistId}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 35,
  },
  otherForecast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: '#000000',
  },
  otherForecastText: {
    fontSize: 22,
  },
  errorText: {
    fontSize: 50,
    bottom: 30,
    marginLeft: 30,
  },
  errorButton: {
    height: 40,
    width: 80,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 30,
  },
});

export default Listing;
