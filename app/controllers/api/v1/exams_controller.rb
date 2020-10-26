class Api::V1::ExamsController < ApplicationController
  before_action :set_exam, only: %i[show update destroy]

  def index
    exams = Exam.all
    json_data = ExamSerializer.new(exams)
    render json: json_data
  end

  def show
  end

  def create
    exam = Exam.create(:name => exam_params[:name], :max => exam_params[:max], :pass => exam_params[:pass])
    json_data = ExamSerializer.new(exam)
    render json: json_data
  end

  def update
    @exam.name = exam_params[:name]
    @exam.max = exam_params[:max]
    @exam.pass = exam_params[:pass]
    @exam.save
    json_data = ExamSerializer.new(@exam)
    render json: json_data
  end

  def destroy
    @exam.destroy
    render json: {}
  end

  private
    def exam_params
      params.require(:exam).permit(:id, :name, :max, :pass)
    end

    def set_exam
      @exam = Exam.find_by_id(params[:id])
    end
end
