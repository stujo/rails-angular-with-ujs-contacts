class Api::V1::ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :update, :destroy]


  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  JSON_FIELDS = [:id, :name, :phone]

  def index
    contacts = Contact.all.order(:id => :desc)
    # This is for the demo OBVIOUSLY
    sleep 1
    render json: contacts.to_json(:only => JSON_FIELDS)
  end

  def show
    render json: @contact.to_json(:only => JSON_FIELDS)
  end

  def create
    contact = Contact.new(contact_params)
    if contact.save
      render json: contact.to_json(:only => JSON_FIELDS), status: :created
    else
      render json: contact.errors, status: :unprocessable_entity 
    end
  end

  def update
    if @contact.update(contact_params)
      render json: @contact.to_json(:only => JSON_FIELDS), status: :created
    else
      render json: @contact.errors, status: :unprocessable_entity 
    end
  end

  def destroy
    @contact.destroy
    format.json { head :no_content }
  end

  
private
  def record_not_found(error)
    render :json => {:error => error.message}, :status => :not_found
  end 

    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_params
      params.require(:contact).permit(:name, :phone)
    end
end
