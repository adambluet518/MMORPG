// js/economy/auctionHouse.js
export class AuctionHouse {
  constructor(economyManager) {
    this.economyManager = economyManager;
    this.listings = [];
  }

  createListing(itemId, seller, price, duration = 86400) {
    const listing = {
      id: `listing_${this.listings.length}`,
      itemId,
      seller,
      price,
      postedAt: Date.now(),
      expiresAt: Date.now() + duration * 1000
    };
    this.listings.push(listing);
    return listing;
  }

  purchaseListing(listingId, buyer) {
    const index = this.listings.findIndex(l => l.id === listingId);
    if (index === -1) return false;
    const listing = this.listings[index];
    if (buyer.gold < listing.price) return false;
    buyer.gold -= listing.price;
    // transfer item to buyer inventory
    this.listings.splice(index, 1);
    return true;
  }

  update() {
    // remove expired listings
    this.listings = this.listings.filter(l => l.expiresAt > Date.now());
  }
}