class Api::FavoritesController < ApplicationController
  def index
    # byebug
    # puts params["user_id"]
    favorites = Favorite.where(favorite: {id: 4})
    # favorites = Favorite.all
    render json: favorites

  end

  # favorites = Users.join(:favorites).where(favorites.favoriter = #{user.id})

  # def create
  #   favorite = Favorite.create! (
  #     favoritee: "favoritee",
  #     favoriter: "favoriter",
  #   )
  #   render json: favorite
  # end


end
# @favorites = User.where(favoritee: params[:id])
#     if records_array.present?
#       render json: records_array
#     else
#       render json: {error: 'Favoritee not found'}
#     # en