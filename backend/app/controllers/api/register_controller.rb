class Api::RegisterController < ApplicationController

  def create
    user = User.create!(
      # name: params["name"], 
      email: params["email"], 
      password: params["password"]
    )
    render json: user
  end
end