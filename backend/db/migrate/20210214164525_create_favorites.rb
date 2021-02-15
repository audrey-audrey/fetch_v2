class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.integer :favoriter
      t.integer :favoritee

      t.timestamps
    end
  end
end
