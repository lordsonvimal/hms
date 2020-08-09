Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :churches
    end
  end
end
