class Change < ActiveRecord::Migration[6.1]
  def change
    rename_column :favorites, :favoriter, :favoriter_id
    rename_column :favorites, :favoritee, :favoritee_id
  end
end
