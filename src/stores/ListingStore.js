import {observable} from 'mobx';
import NetworkOps from 'Demo/src/network/NetworkOps';
import {ListingModel} from './models/ListingModel';
import {_} from 'lodash';

export default class ListingStore {
  @observable listingData: Array<ListingModel> = [];

  async getSongsListing() {
    const url = '/search?term=Michael+jackson';
    console.log(url);
    const res = await NetworkOps.get(url);
    console.log(res);
    if (res.status == 200) {
      this.listingData = res.data.results;
    }
    return res;
  }
}
