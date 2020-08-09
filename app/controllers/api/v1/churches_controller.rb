class Api::V1::ChurchesController < ApplicationController
  before_action :set_church, only: %i[show update destoy]

  def index
    @churches = Church.all
    render json: @churches
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
    def church_params
      params.require(:church).permit(:id, :name, :place)
    end

    def set_church
    end
end
