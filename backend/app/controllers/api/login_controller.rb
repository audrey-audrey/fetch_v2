class Api::LoginController < ApplicationController

  def create
    user = User.where(email: params["email"], password: params["password"])
    puts params
    puts "HELLO"
    render json: user
  
  end
end