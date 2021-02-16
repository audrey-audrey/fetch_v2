class Api::FavoriteController < ApplicationController
  def index
  end

  def create
    favorite = Favorite.create! (
      favoritee: "favoritee",
      favoriter: "favoriter",
    )
    render json: favorite
  end
end
