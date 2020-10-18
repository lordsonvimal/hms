class Api::V1::ChurchesController < ApplicationController
  before_action :set_church, only: %i[show update destroy]

  def index
    churches = Church.all
    render json: churches
  end

  def show
  end

  def create
    church = Church.create(:name => church_params[:name], :place => church_params[:place])
    render json: church
  end

  def update
    @church.name = church_params[:name]
    @church.place = church_params[:place]
    @church.save
    render json: @church
  end

  def destroy
    @church.destroy
    render json: {}
  end

  private
    def church_params
      params.require(:church).permit(:id, :name, :place)
    end

    def set_church
      @church = Church.find_by_id(church_params[:id])
    end
end
