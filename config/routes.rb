Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :churches
      resources :exams
    end
  end
end
