class MessagesController < ApplicationController
  def index
    @room = Room.find(params[:room_id])
    if @room.user_ids.include?(current_user.id)
      @message = Message.new
      @messages = @room.messages.includes(:user)
    else
      redirect_to root_path
    end
  end

  def create
    @room = Room.find(params[:room_id])
    @message = @room.messages.new(message_params)
    if @message.save
      ActionCable.server.broadcast 'message_channel', {name: current_user.name, content: @message, date: l(@message.created_at)}
    else
      @messages = @room.messages.includes(:user)
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content).merge(user_id: current_user.id)
  end
end
