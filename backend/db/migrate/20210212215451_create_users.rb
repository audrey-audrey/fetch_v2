class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password
      t.string :location
      t.string :dog_name
      t.string :primary_image
      t.string :image_2
      t.string :image_3
      t.string :image_4
      t.string :image_5
      t.text :bio
      t.boolean :playful
      t.boolean :affectionate
      t.boolean :high_energy
      t.boolean :shy
      t.boolean :well_trained
      t.boolean :large
      t.timestamps
    end
  end
end
