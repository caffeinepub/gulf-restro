import Text "mo:core/Text";
import Float "mo:core/Float";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  type RestaurantInfo = {
    name : Text;
    tagline : Text;
    address : Text;
    hours : Text;
  };

  type MenuItem = {
    name : Text;
    description : Text;
    price : Float;
    category : Text;
  };

  type Feature = {
    name : Text;
    description : Text;
  };

  let restaurantInfo : RestaurantInfo = {
    name = "Gulf Restro";
    tagline = "Authentic Flavors, Vibrant Atmosphere";
    address = "123 Main Street, City, Country";
    hours = "Mon-Sun: 11am - 11pm";
  };

  let menuCategories = Map.fromIter(
    [("Starters", ["Appetizers to begin your meal"]), ("Main Course", ["Hearty main dishes"]), ("Beverages", ["Refreshing drinks"])].values()
  );

  let poolTablesFeature : Feature = {
    name = "Pool Tables";
    description = "Enjoy a game of pool while you dine!";
  };

  let tapriCorner : Feature = {
    name = "Tapri Corner";
    description = "Inspired chai and snacks corner.";
  };

  let outdoorSeating : Feature = {
    name = "Outdoor Seating";
    description = "Relax in our beautiful outdoor area.";
  };

  let features = [poolTablesFeature, tapriCorner, outdoorSeating];

  let menuItems = List.empty<MenuItem>();

  menuItems.add({
    name = "Samosa";
    description = "Golden fried pastry with spicy filling";
    price = 2.5;
    category = "Starters";
  });
  menuItems.add({
    name = "Paneer Tikka";
    description = "Grilled cottage cheese cubes in spicy marinade";
    price = 5.0;
    category = "Starters";
  });
  menuItems.add({
    name = "Butter Chicken";
    description = "Tender chicken in rich tomato gravy";
    price = 7.5;
    category = "Main Course";
  });
  menuItems.add({
    name = "Chicken Biryani";
    description = "Aromatic rice dish with chicken and spices";
    price = 8.0;
    category = "Main Course";
  });
  menuItems.add({
    name = "Mango Lassi";
    description = "Refreshing yogurt-based mango drink";
    price = 3.0;
    category = "Beverages";
  });
  menuItems.add({
    name = "Chai";
    description = "Traditional Indian spiced tea";
    price = 1.5;
    category = "Beverages";
  });

  public query ({ caller }) func getRestaurantInfo() : async RestaurantInfo {
    restaurantInfo;
  };

  public query ({ caller }) func getMenuCategories() : async [(Text, [Text])] {
    menuCategories.toArray();
  };

  public query ({ caller }) func getAllMenuItems() : async [MenuItem] {
    menuItems.toArray();
  };

  public query ({ caller }) func getMenuItemsByCategory(category : Text) : async [MenuItem] {
    menuItems.toArray().filter(func(item) { item.category == category });
  };

  public query ({ caller }) func getFeatures() : async [Feature] {
    features;
  };
};
