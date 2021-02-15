class Api::ConversationsController < ApplicationController

  def index 
    conversations = Conversation.select('*').where("initiator_id = ? OR recipient_id = ? ", params[:id], params[:id])
    initiators = conversations.joins("INNER JOIN users ON conversations.initiator_id = users.id")
    recipients = conversations.joins("INNER JOIN users ON conversations.recipient_id = users.id")
    render json: {conversations: conversations, initiators: initiators, recipients: recipients}
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
