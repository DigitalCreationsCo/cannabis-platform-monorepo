// this is a class for curating different lists for vendors and products,
// based on an algorithm method provided with the list
// algorithms for curating different vendor and product lists can be defined here :)
//

// what are some lists that can curated?
// recent vendors (order history and view History)
// recent products (product order history and product view history)
// products on a liked products list
// new releases by vendors in local area

// i don't need to build these at the moment. Work on core functionality! :D

const ListBuilder = {
  YOUR_LOCAL_SHOPS: (vendors) => {
    return {
      title: "Your Local Shops",
      data: vendors,
    };
  },
  RECENT_VENDORS: (vendors) => {
    return {
      title: "Recent Vendors",
      data: vendors,
    };
  },
  FEATURED_PRODUCTS: (products) => {
    return {
      title: "Featured Products",
      data: products,
    };
  },
  FAVORITE_PRODUCTS: (products) => {
    return {
      title: "Your Favorite Products",
      data: products,
    };
  },
};

export default ListBuilder;
