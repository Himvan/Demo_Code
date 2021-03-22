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
          style={{
            flex: 0.6,
            marginLeft: 10,
            justifyContent: 'space-between',
            paddingBottom: 10,
          }}>
          <Text style={{color: '#6BA1D9', fontSize: 18}} numberOfLines={3}>
            {item.collectionName ? item.collectionName : item.trackName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#6BA1D9', fontWeight: 'bold', fontSize: 12}}>
              {item.artistName}
            </Text>
            <Text
              style={{
                marginLeft: 20,
                color: '#6BA1D9',
                fontWeight: 'bold',
                fontSize: 12,
              }}>
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

export default Listing;
