class Api::LoginController < ApplicationController

  def create
    user = User.where(email: params["email"], password: params["password"])
    render json: user
  
  end
end