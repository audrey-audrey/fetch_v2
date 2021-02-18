class Api::UsersController < ApplicationController

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
    if user.update(user_params)
      puts 'update successful'
    else
      puts 'failed to update'
    end
  end

  def user_params
    params.permit(:name, :email, :location, :dog_name, :bio, :playful, :affectionate, :shy, :high_energy, :well_trained, :large)
  end
  
end
