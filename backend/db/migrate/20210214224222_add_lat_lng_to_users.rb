class AddLatLngToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :lat, :float
    add_column :users, :lng, :float
  end
end
