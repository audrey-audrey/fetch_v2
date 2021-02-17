class Api::FavoritesController < ApplicationController
  def index
    favorites = Favorite.select("*").where("favoriter_id = ?", params["user_id"]).joins("INNER JOIN users ON favorites.favoritee_id = users.id")
    # user = User.find(params["user_id"])
    render json: favorites
  end
  def create
    # favorite = Favorite.where(favoriter: params["user_id"], favoritee: params["selected"])
    # render json: favorite
    puts "........................................"
    puts params[:user_id]
    puts params[:favoritee][:id]
    fav = Favorite.new
    fav.favoritee_id = params[:favoritee][:id].to_i
    fav.favoriter_id = params[:user_id].to_i
    if fav.save
      render json: {status: "ok"}
    else 
      render json: {status: "error"}
    end
  end

end
