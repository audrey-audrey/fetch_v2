class Api::UsersController < ApplicationController
  require 'geocoder'

  def index 
    users = User.all
    render json: users
  end

  def show
    user = User.where(id: params[:id])
    if user.present?
      render json: user
    else
      render json: {error: 'User not found'}
    end
  end

  def update
    user = User.find_by(id: params[:id])
    user.lat = Geocoder.search(params[:location]).first.coordinates[0]
    user.lng = Geocoder.search(params[:location]).first.coordinates[1]
    if user.update(user_params)
      render json: user
    else
      render json: {error: 'Failed to update user'}
    end
  end

  def user_params
    params.permit(:name, :email, :location, :dog_name, :bio, :playful, :affectionate, :shy, :high_energy, :well_trained, :large)
  end
  
end
