class Api::MessagesController < ApplicationController

  def index 
    
  end

  def create
    if Conversation.link(params[:initiator_id], params[:recipient_id]).present?
      conversation = Conversation.link(params[:initiator_id], params[:recipient_id]).first
    else
      conversation = Conversation.create!(conversation_params)
    end

    render json :conversation
  end
  


  private
  def conversation_params
    params.permit(:initiator_id, :recipient_id)
  end
end
