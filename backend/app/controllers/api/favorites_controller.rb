class Api::FavoritesController < ApplicationController
  def index
    favorites = Favorite.select("favoritee").where("favoriter = ?", params["user_id"])
    render json: favorites
  end
end
